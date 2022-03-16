package com.acrylic.security;

import com.acrylic.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

import static java.lang.String.format;

public class JWTUtils {

    private final static String JWT_SECRET = "edk$#O3oE@OKk2oo3OK$RKIkiki3KIki3kJJURFU#uh4f83jufju3unfUHf838u3hrvj3juf3c 4v gd2f3f3de2shb546y5g53R#35T4G4AR5ijwdk2iI$Iikf3krfkerkfolgooykhki4fre3nufcb3493o4KFKdfrgMYD2yg54IJGTNUVNCVRWJM($4";
    private final static String JWT_ISSUER = "market-fs.com";
    private final static String SUBJECT_DELIMITER = ",";
    
    public record JWTUserSubject(Long id, String username, String email) {}

    private String toSubject(User user) {
        return "%s%s%s%s%s".formatted(
                user.getId(), SUBJECT_DELIMITER,
                user.getUsername(), SUBJECT_DELIMITER,
                user.getEmail());
    }

    public String createToken(User user) {
        return Jwts.builder()
                .setSubject(format("%s,%s", user.getId(), user.getUsername()))
                .setIssuer(JWT_ISSUER)
                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 604_800_000))
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

}
