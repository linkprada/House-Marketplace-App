import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { DataBase } from "../firebase.config";
import shareIcon from "../assets/svg/shareIcon.svg";

function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth();

    useEffect(() => {
        const getListing = async () => {
            const docRef = doc(DataBase, "listings", params.listingId);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                setListing(docSnapshot.data());
                setLoading(false);
            }
        };

        getListing();
    }, [navigate, params.listingId]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareLinkCopied(true);
        setTimeout(() => {
            setShareLinkCopied(false);
        }, 2000);
    };

    const formatPrice = () => {
        if (listing.offer) {
            return listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <main>
            {/* <Helmet>
                <title>{listing.name}</title>
            </Helmet>
            <Swiper slidesPerView={1} pagination={{ clickable: true }}>
                {listing.imgUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                                backgroundSize: "cover",
                            }}
                            className="swiperSlideDiv"
                        ></div>
                    </SwiperSlide>
                ))}
            </Swiper> */}

            <div className="shareIconDiv" onClick={copyToClipboard}>
                <img src={shareIcon} alt="" />
            </div>

            {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

            <div className="listingDetails">
                <p className="listingName">
                    {listing.name} - ${formatPrice()}
                </p>
                <p className="listingLocation">{listing.location}</p>
                <p className="listingType">For {listing.type === "rent" ? "Rent" : "Sale"}</p>
                {listing.offer && (
                    <p className="discountPrice">
                        ${listing.regularPrice - listing.discountedPrice} discount
                    </p>
                )}

                <ul className="listingDetailsList">
                    <li>{listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : "1 Bedroom"}</li>
                    <li>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : "1 Bathroom"}
                    </li>
                    <li>{listing.parking && "Parking Spot"}</li>
                    <li>{listing.furnished && "Furnished"}</li>
                </ul>

                <p className="listingLocationTitle">Location</p>

                {/* <div className="leafletContainer">
                    <MapContainer
                        style={{ height: "100%", width: "100%" }}
                        center={[listing.geolocation.lat, listing.geolocation.lng]}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                        />

                        <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
                            <Popup>{listing.location}</Popup>
                        </Marker>
                    </MapContainer>
                </div> */}

                {auth.currentUser?.uid !== listing.userRef && (
                    <Link
                        to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                        className="primaryButton"
                    >
                        Contact Landlord
                    </Link>
                )}
            </div>
        </main>
    );
}

export default Listing;
