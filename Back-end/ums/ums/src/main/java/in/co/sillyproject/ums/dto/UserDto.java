package in.co.sillyproject.ums.dto;

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
	private long mobileNo;
	private String address;
	@Override
	public String toString() {
		return "UserDto [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", userName=" + userName
				+ ", emailId=" + emailId + ", mobileNo=" + mobileNo + ", address=" + address + "]";
	}
	
	
}
