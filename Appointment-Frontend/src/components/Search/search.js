import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import "./search.css";
import Header from "../Header1/header";
import Footer from "../Footer/footer";

const API_ENDPOINT = "http://localhost:8084/api/v1/doctors/search";

const Search = () => {
  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const cancelToken = useRef(null);
  const prevSearchTerm = useRef("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    //document.body.style.backgroundImage = `url(${back})`
    document.body.style.background = "linear-gradient(to top, white, white)";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  let id = user.id;

  console.log(id);

  const search = async () => {
    const currentSearchTerm = searchTerm.trim();

    if (
      currentSearchTerm.length === 0 ||
      currentSearchTerm === prevSearchTerm.current
    ) {
      return;
    }
    prevSearchTerm.current = currentSearchTerm;

    if (cancelToken.current) {
      cancelToken.current.cancel();
    }
    cancelToken.current = axios.CancelToken.source();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axios.get(
        `${API_ENDPOINT}?query=${searchTerm}&userId=${id}`,
        {
          cancelToken: cancelToken.current.token,
        }
      );

      const results = response.data;
      setSearchResults(results);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error);
      }
    }
  };

  const handleSearch = () => {
    search();
  };

  useEffect(() => {
    const fetchData = async () => {
      await search();
    };
    fetchData();
  }, [searchTerm]);

  return (
    <>
      <Header />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="search-container">
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onFocus={() => {
            setIsInputFocused(true);
          }}
          onBlur={() => {
            setIsInputFocused(false);
          }}
          placeholder="name,city or specialization....."
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
        {searchTerm && searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((item) => (
              <li className="search-li" key={item.id}>
                {" "}
                <img className="search-img" src={item.imageUrl} />{" "}
                <p className="search-username">
                  <Link
                    onClick={() => {
                      searchInputRef.current.focus();
                    }}
                    to={"/doctor/details"}
                    state={{
                      name: item.name,
                      image: item.imageUrl,
                      email: item.email,
                      description: item.description,
                      joinDate: item.joinDate,
                      docLocation: item.location,
                      specialization: item.specialization,
                      phone: item.tele,
                      docId: item.docId,
                    }}
                  >
                    {item.name}{" "}
                  </Link>
                </p>{" "}
                <div className="search-wrap">
                  <p className="search-spec">{item.specialization} </p>{" "}
                  <p className="search-city">-{item.city}</p>
                </div>{" "}
                <hr></hr>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="introSearch align-items-center">
        <p>
          Notre application de prise de rendez-vous chez les médecins est conçue
          pour simplifier et rationaliser le processus de prise de rendez-vous
          médicaux. les patients peuvent facilement{" "}
        </p>
        <p className="sec-par">
          rechercher des médecins par spécialité et ville, et réserver un
          rendez-vous en ligne en quelques clics.
        </p>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
};

export default Search;
