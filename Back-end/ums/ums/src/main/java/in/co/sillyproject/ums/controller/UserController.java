package in.co.sillyproject.ums.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.co.sillyproject.ums.dto.ApiResponse;
import in.co.sillyproject.ums.dto.UserDto;
import in.co.sillyproject.ums.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	
	private UserService userService;	
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/")
    public ResponseEntity<UserDto> viewUser(@RequestParam String userName) {
    	return ResponseEntity.ok().body(userService.viewUser(userName)); 
    }
	
	@PostMapping("/")
    public ResponseEntity<?> addUser(@RequestBody UserDto userDto) {
		System.out.println(userDto);
		if(userService.addUser(userDto))
			return ResponseEntity.ok().body(new ApiResponse(true, "User Registered successfully")); 
		else
			return ResponseEntity.badRequest().body(new ApiResponse(false, "Username already exists")); 

    }
	
	@PutMapping("/")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
    	return ResponseEntity.ok().body(userService.updateUser(userDto)); 
    }
	
	@DeleteMapping("/")
    public ResponseEntity<?> addUser(@RequestParam String userName) {
    	return ResponseEntity.ok().body(userService.deleteUser(userName)); 
    }

	@GetMapping("/list")
    public ResponseEntity<List<UserDto>> getAllUsers() {
    	return ResponseEntity.ok().body(userService.getUsers()); 
    }

}
