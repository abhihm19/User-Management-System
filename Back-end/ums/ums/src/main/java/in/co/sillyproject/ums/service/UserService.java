package in.co.sillyproject.ums.service;

import java.util.List;

import org.springframework.stereotype.Service;

import in.co.sillyproject.ums.exception.CustomException;
import in.co.sillyproject.ums.exception.ResourceNotFoundException;
import in.co.sillyproject.ums.model.User;
import in.co.sillyproject.ums.repository.UserRepository;

@Service
public class UserService {

	private UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public String addUser(User user) {
		if (userRepository.findByUserName(user.getUserName()) != null)
			throw new CustomException("Username already taken");
		userRepository.save(user);
		return "User added successfully";

	}

	public String updateUser(long id, User user) {
		System.out.println(user);
		User existingUser = userRepository.findById(id);		
		if(existingUser == null)
			throw new ResourceNotFoundException("User with id "+user.getId()+" not found");
		existingUser.setFirstName(user.getFirstName());
		existingUser.setLastName(user.getLastName());
		existingUser.setEmailId(user.getEmailId());
		existingUser.setMobileNo(user.getMobileNo());
		existingUser.setAddress(user.getAddress());
		userRepository.save(existingUser);
		return "User updated successfully";
	}

	public String deleteUser(long id) {
		User existingUser = userRepository.findById(id);
		if(existingUser == null)
			throw new ResourceNotFoundException("User with id "+id+" not found");	
		userRepository.delete(existingUser);
		return "User deleted successfully";
	}

	public User viewUser(long id) {
		User existingUser = userRepository.findById(id);
		if(existingUser == null)
			throw new ResourceNotFoundException("User with id "+id+" not found");		
		return existingUser;
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

}
