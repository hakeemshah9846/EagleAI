import React from "react"; 
//redux 
import withRouter from "../../components/Common/withRouter";
import ContactsProfile from "../../components/Contacts/ContactsProfile/contacts-profile";
 

const UserProfile = props => {

  document.title = "Profile | EagleAI"

  return (
      <ContactsProfile />
  );
};

export default withRouter(UserProfile);
