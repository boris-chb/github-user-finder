import User from "./User";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

const UsersList = (props) => {
  const { users, loading } = props;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="users-list" style={userStyle}>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default UsersList;
