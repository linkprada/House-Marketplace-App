import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function CreateListing() {
    const [loading, setLoading] = useState(false);
    const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0,
    });

    const navigate = useNavigate();

    const isMounted = useRef(true);

    const auth = getAuth();

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid });
                } else {
                    navigate("/sign-in");
                }
            });
        }

        return () => {
            isMounted.current = false;
        };
    }, [isMounted]);

    if (loading) {
        return <Spinner></Spinner>;
    }

    return <div>CreateListing</div>;
}

export default CreateListing;
