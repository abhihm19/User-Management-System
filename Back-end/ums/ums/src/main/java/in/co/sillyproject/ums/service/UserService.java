package in.co.sillyproject.ums.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import in.co.sillyproject.ums.dto.ApiResponse;
import in.co.sillyproject.ums.dto.UserDto;
import in.co.sillyproject.ums.model.User;
import in.co.sillyproject.ums.repository.UserRepository;

@Service
public class UserService {

	private UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public boolean addUser(UserDto userDto) {
		System.out.println(userDto);
		if (userRepository.findByUserName(userDto.getUserName()) != null)
			return false;
		else {
			User user = new User();
			user.setFirstName(userDto.getFirstName());
			user.setLastName(userDto.getLastName());
			user.setUserName(userDto.getUserName());
			user.setEmailId(userDto.getEmailId());
			user.setMobileNo(userDto.getMobileNo());
			user.setAddress(userDto.getAddress());
			System.out.println(user);
			userRepository.save(user);
			return true;
		}
	}

	public ApiResponse updateUser(UserDto userDto) {
		User user = userRepository.findByUserName(userDto.getUserName());
		
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setEmailId(userDto.getEmailId());
		user.setMobileNo(userDto.getMobileNo());
		user.setAddress(userDto.getAddress());
		userRepository.save(user);
		return new ApiResponse(true, "user updated successfully");
		}	

	public ApiResponse deleteUser(String userName) {
		User user = userRepository.findByUserName(userName);		
		userRepository.delete(user);
		return new ApiResponse(true, "user deleted successfully");
	}
	
	public UserDto viewUser(String userName) {
		User user = userRepository.findByUserName(userName);		
		UserDto userDto = new UserDto();
		userDto.setFirstName(user.getFirstName());
		userDto.setLastName(user.getLastName());
		userDto.setUserName(user.getUserName());
		userDto.setEmailId(user.getEmailId());
		userDto.setMobileNo(user.getMobileNo());
		userDto.setAddress(user.getAddress());
		return userDto;
	}
	
	public List<UserDto> getUsers(){
		List<User> users = userRepository.findAll();
		return users.stream().map((user) -> mapToUserDto(user)).collect(Collectors.toList());
	}
	
	private UserDto mapToUserDto(User user) {
		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setFirstName(user.getFirstName());
		userDto.setLastName(user.getLastName());
		userDto.setUserName(user.getUserName());
		userDto.setEmailId(user.getEmailId());
		userDto.setMobileNo(user.getMobileNo());
		userDto.setAddress(user.getAddress());
		return userDto;
		
	}
	
	
}


