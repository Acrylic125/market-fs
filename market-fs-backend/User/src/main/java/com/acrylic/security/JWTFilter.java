package com.acrylic.security;

import com.acrylic.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class JWTFilter extends OncePerRequestFilter {

    private final static String BEARER_PREFIX = "Bearer ";

    private final UserService userService;
    private final JWTUtils jwtUtils;

    public JWTFilter(UserService userService, JWTUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authorizationValue = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authorizationValue == null || !authorizationValue.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authorizationValue.split(" ")[1].trim();
        Optional<Jws<Claims>> extractedTokenOptional = jwtUtils.parseToken(token);
        if (extractedTokenOptional.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }
        Jws<Claims> extractedToken = extractedTokenOptional.get();

        // Resumes if extractToken does not throw an exception.
        Optional<JWTUtils.JWTUserSubject> subjectOptional =
                jwtUtils.parseSubject(extractedToken.getBody().getSubject());
        if (subjectOptional.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }
        JWTUtils.JWTUserSubject subject = subjectOptional.get();

        UserDetails user = userService.findUserByUsername(subject.username());

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                    user, null,
                    user.getAuthorities());

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }

}
