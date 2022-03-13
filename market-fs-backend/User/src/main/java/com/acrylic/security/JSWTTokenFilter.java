package com.acrylic.security;

import com.acrylic.exceptions.UserAuthenticationException;
import com.acrylic.repository.UserRepository;
import com.acrylic.service.UserService;
import io.jsonwebtoken.*;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class JSWTTokenFilter extends OncePerRequestFilter {

    private final static String JWT_SECRET = "edk$#O3oE@OKk2oo3OK$RKIkiki3KIki3kJJURFU#uh4f83jufju3unfUHf838u3hrvj3juf3c 4v gd2f3f3de2shb546y5g53R#35T4G4AR5ijwdk2iI$Iikf3krfkerkfolgooykhki4fre3nufcb3493o4KFKdfrgMYD2yg54IJGTNUVNCVRWJM($4";
    private final static String BEARER_PREFIX = "Bearer ";

    private final UserService userService;

    public JSWTTokenFilter(UserService userService) {
        this.userService = userService;
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
        Jws<Claims> extractedToken = extractToken(token);
        // Resumes if extractToken does not throw an exception.
        String[] subjects = extractedToken.getBody().getSubject().split(",");
        String username = subjects[1];

        UserDetails user = userService.findUserByUsername(username);

        UsernamePasswordAuthenticationToken
                authentication = new UsernamePasswordAuthenticationToken(
                user, null,
                user.getAuthorities()
        );

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }

    private Jws<Claims> extractToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(JWT_SECRET)
                    .parseClaimsJws(token);
        } catch (SignatureException ex) {
            throw new UserAuthenticationException("Invalid JWT Signature.");
        } catch (MalformedJwtException ex) {
            throw new UserAuthenticationException("Invalid JWT Token.");
        } catch (ExpiredJwtException ex) {
            throw new UserAuthenticationException("Expired JWT Token.");
        } catch (UnsupportedJwtException ex) {
            throw new UserAuthenticationException("Unsupported JWT Token.");
        } catch (IllegalArgumentException ex) {
            throw new UserAuthenticationException("JWT claims is empty.");
        }
    }
}
