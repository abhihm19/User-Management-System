package in.co.sillyproject.ums.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

import in.co.sillyproject.ums.dto.UserDto;
import in.co.sillyproject.ums.exception.CustomException;
import in.co.sillyproject.ums.exception.ResourceNotFoundException;
import in.co.sillyproject.ums.model.User;
import in.co.sillyproject.ums.repository.UserRepository;

@Service
public class UserService {

	@Value("${application.bucket.name}")
	private String bucketName;
	
	@Autowired
	private AmazonS3 s3Client;
	
	private UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public String uploadFile(MultipartFile multipartFile) {
		File file = convertMultipartFileToFile(multipartFile);
		String fileName = System.currentTimeMillis()+" "+file.getName();
		s3Client.putObject
			(new PutObjectRequest(bucketName, fileName, file));
		file.delete();
		return fileName;
	}

	private File convertMultipartFileToFile(MultipartFile file) {
		File convertedFile = new File(file.getOriginalFilename());
		try {
			FileOutputStream fos = new FileOutputStream(convertedFile);
			fos.write(file.getBytes());
			fos.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return convertedFile;
	}
	
	public byte[] downloadFile(String fileName) {
		S3Object s3Object = s3Client.getObject(bucketName, fileName);
		S3ObjectInputStream s3ObjectInputStream = s3Object.getObjectContent();
		
		try {
			byte[] content = IOUtils.toByteArray(s3ObjectInputStream);
			return content;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public String deleteFile(String fileName) {
		s3Client.deleteObject(bucketName, fileName);
		return fileName+" deleted successfully";
	}

	public String addUser(UserDto userDto) {
		if (userRepository.findByUserName(userDto.getUserName()) != null)
			throw new CustomException("*Username already taken");
		User user = new User();
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setUserName(userDto.getUserName());
		user.setEmailId(userDto.getEmailId());
		user.setMobileNo(userDto.getMobileNo());
		user.setAddress(userDto.getAddress());
		String profilePhotoName = uploadFile(userDto.getMultipartFile());
		user.setProfilePhotoName(profilePhotoName);
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

	public boolean checkUserNameAvailability(String userName) {
		if(userRepository.findByUserName(userName) == null)
			return true;
		return false;
	}

}
