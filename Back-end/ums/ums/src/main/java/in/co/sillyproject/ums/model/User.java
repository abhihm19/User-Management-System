package in.co.sillyproject.ums.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;	
	
	@NotNull
	private String firstName;
	@NotNull
	private String lastName;	
	@NotNull
	private String userName;
	@NotNull
	private String emailId;
	@NotNull
	private String mobileNo;
	@NotNull
	private String address;
	@NotNull
	private String profilePhotoName;

	@Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", userName=" + userName
				+ ", emailId=" + emailId + ", mobileNo=" + mobileNo + ", address=" + address + "]";
	}
	
	
	
}
