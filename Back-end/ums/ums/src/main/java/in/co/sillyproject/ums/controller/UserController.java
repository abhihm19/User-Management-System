package in.co.sillyproject.ums.controller;

import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import in.co.sillyproject.ums.dto.UserDto;
import in.co.sillyproject.ums.model.User;
import in.co.sillyproject.ums.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}   

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam(value = "file") MultipartFile file) {
        return new ResponseEntity<>(userService.uploadFile(file), HttpStatus.OK);
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) {
        byte[] data = userService.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }

    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        return new ResponseEntity<>(userService.deleteFile(fileName), HttpStatus.OK);
    }
	
	@GetMapping("/check-username-availability")
	public ResponseEntity<?> checkUserNameAvailability(@RequestParam String userName) {
		System.out.println(userName);
		return ResponseEntity.ok().body(userService.checkUserNameAvailability(userName));
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> viewUser(@PathVariable long id) {
		System.out.println(id);
		return ResponseEntity.ok().body(userService.viewUser(id));
	}

	@PostMapping("/")
	public ResponseEntity<?> addUser(@RequestBody UserDto userDto) {
		System.out.println(userDto);
		return ResponseEntity.ok().body(userService.addUser(userDto));

	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateUser(@PathVariable long id, @RequestBody User user) {
		return ResponseEntity.ok().body(userService.updateUser(id, user));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable long id) {
		return ResponseEntity.ok().body(userService.deleteUser(id));
	}

	@GetMapping("/")
	public ResponseEntity<List<User>> getAllUsers() {
		return ResponseEntity.ok().body(userService.getAllUsers());
	}

}
