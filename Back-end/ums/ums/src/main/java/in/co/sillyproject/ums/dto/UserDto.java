package in.co.sillyproject.ums.dto;


import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
	
	private long id;	
	private String firstName;
	private String lastName;	
	private String userName;
	private String emailId;
	private String mobileNo;
	private String address;
	private MultipartFile multipartFile;

}
