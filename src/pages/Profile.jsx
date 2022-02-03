import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

function Profile() {
    const [user, setUser] = useState(null);

    const auth = getAuth();

    useEffect(() => {
        setUser(auth.currentUser);
    }, []);

    if (user) {
        return <h1>{user.displayName}</h1>;
    }

    return <div>Not logged in</div>;
}

export default Profile;
