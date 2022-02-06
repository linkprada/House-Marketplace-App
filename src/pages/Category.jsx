import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react/cjs/react.development";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { DataBase } from "../firebase.config";

function Category() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const getListings = async () => {
            try {
                const listingsRef = collection(DataBase, "listings");
                const getQuery = query(
                    listingsRef,
                    where("type", "==", params.categoryName),
                    orderBy("timestamp", "desc"),
                    limit(10)
                );

                const getQuerySnapshot = await getDocs(getQuery);

                const listings = [];
                getQuerySnapshot.forEach((doc) => {
                    listings.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });

                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error("Could not get the listings");
            }
        };

        getListings();
    }, [params.categoryName]);

    return (
        <div className="category">
            <header>
                <p className="pageHeader">
                    {params.categoryName === "rent" ? "Places for rent" : "Places for sale"}
                </p>
            </header>

            {loading ? (
                <Spinner />
            ) : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className="categoryListings">
                            {listings.map((listing) => (
                                <ListingItem
                                    key={listing.id}
                                    listing={listing.data}
                                    id={listing.id}
                                ></ListingItem>
                            ))}
                        </ul>
                    </main>
                </>
            ) : (
                <p>No listings for {params.categoryName}</p>
            )}
        </div>
    );
}

export default Category;
