import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function Home({ user }) {
  if (user == "loading") {
    return <section>Loading.... please wait.</section>;
  }

  if (!user) {
    return (
      <>
        <section>
          Welcome to your user page, <Link to="/login">Login</Link> / <Link to="register">Register</Link> to get started.
        </section>
      </>
    );
  }

  return <UserHome user={user} />;
}

function UserHome({ user }) {
  const [image, setImage] = useState(null);
  const storage = getStorage();
  const imageRef = ref(storage, `images/${user.email}`);

  useEffect(() => {
    getDownloadURL(imageRef).then((url) => {
      setImage(url);
    });
  }, []);

  return (
    <section>
      {image ? 
        <img src={image} className="user-porfile-picture"/> :
        "loading image"
      }
      <h2>Email: {user.email}</h2>
    </section>
  );
}
