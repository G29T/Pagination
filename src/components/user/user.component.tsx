import './user.styles.css';
import {UserType} from '../../types/user';

const User = ({ user }: {user: UserType}) => {
    return (
        <div className="user-container" key={user.id}>
            <p>Username: {user.username}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Address: {`${user.address.street}, ${user.address.suite}, ${user.address.city}`}</p>
        </div>
    )
}

export default User;