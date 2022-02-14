import { getAuth, updateProfile } from "firebase/auth";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataBase } from "../firebase.config";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItem from "../components/ListingItem";

function Profile() {
    const auth = getAuth();

    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    const { name, email } = formData;

    const [changeDetails, setChangeDetails] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserListings = async () => {
            const listingsRef = collection(DataBase, "listings");

            const q = query(
                listingsRef,
                where("userRef", "==", auth.currentUser.uid),
                orderBy("timestamp", "desc")
            );

            const querySnap = await getDocs(q);

            let listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });

            setListings(listings);
            setLoading(false);
        };

        fetchUserListings();
    }, [auth.currentUser.uid]);

    const onLogout = () => {
        auth.signOut();
        navigate("/");
    };

    const handleChangeDetails = () => {
        if (changeDetails) {
            onSubmit();
        }
        setChangeDetails((prevState) => !prevState);
    };

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });

                const userRef = doc(DataBase, "users", auth.currentUser.uid);
                await updateDoc(userRef, {
                    name,
                });
            }
        } catch (error) {
            toast.error("Could not update profile details");
        }
    };

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onDelete = async (listingId) => {
        if (window.confirm("Are you sure you want to delete?")) {
            await deleteDoc(doc(DataBase, "listings", listingId));
            const updatedListings = listings.filter((listing) => listing.id !== listingId);
            setListings(updatedListings);
            toast.success("Successfully deleted listing");
        }
    };

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button onClick={onLogout} type="button" className="logOut">
                    Logout
                </button>
            </header>

            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal Details</p>
                    <p onClick={handleChangeDetails} className="changePersonalDetails">
                        {changeDetails ? "done" : "change"}
                    </p>
                </div>
                <div className="profileCard">
                    <form>
                        <input
                            type="text"
                            id="name"
                            className={changeDetails ? "profileNameActive" : "profileName"}
                            disabled={!changeDetails}
                            value={name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="email"
                            className="profileEmail"
                            disabled
                            value={email}
                        />
                    </form>
                </div>
                <Link to="/create-listing" className="createListing">
                    <img src={homeIcon} alt="home" />
                    <p>Sell or rent your home</p>
                    <img src={arrowRight} alt="arrow right" />
                </Link>

                {!loading && listings?.length > 0 && (
                    <>
                        <p className="listingText">Your Listings</p>
                        <ul className="listingsList">
                            {listings.map((listing) => (
                                <ListingItem
                                    key={listing.id}
                                    listing={listing.data}
                                    id={listing.id}
                                    onDelete={() => onDelete(listing.id)}
                                ></ListingItem>
                            ))}
                        </ul>
                    </>
                )}
            </main>
        </div>
    );
}

export default Profile;
