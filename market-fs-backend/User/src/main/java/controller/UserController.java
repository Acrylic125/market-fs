package controller;

import com.acrylic.entity.User;
import com.acrylic.requests.UserRequestBody;
import com.acrylic.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping(path = "/api/v1/users")
public record UserController(UserService userService) {

    @GetMapping("id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.findUserByUsername(username);;
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("new")
    public ResponseEntity<Long> postUser(@RequestBody UserRequestBody requestBody) {
        User user = User.builder()
                .username(requestBody.username())
                .passwordHash(requestBody.password())
                .email(requestBody.email())
                .dateOfBirth(requestBody.dateOfBirth())
                .firstJoined(LocalDateTime.now())
                .build();
        User posted = userService.createUser(user);
        return new ResponseEntity<>(posted.getId(), HttpStatus.CREATED);
    }

    @PutMapping("id/{id}")
    public ResponseEntity<Integer> putUser(@PathVariable Long id, @RequestBody UserRequestBody requestBody) {
        User user = User.builder()
                .username(requestBody.username())
                .email(requestBody.email())
                .dateOfBirth(requestBody.dateOfBirth())
                .build();
        Integer records = userService.updateUserById(id, user);
        return new ResponseEntity<>(records, HttpStatus.OK);
    }

}
