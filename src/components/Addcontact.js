import React, { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const Addcontact = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState(null);

  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [isWhatsapp, setIsWhatsapp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    //   // upload to fireabse

    if (profile == null) return;
    const imageRef = ref(storage, `image/${profile.name + v4()}`);
    uploadBytes(imageRef, profile).then(() => {
      alert("Image Uploaded");
      getDownloadURL(imageRef)
        .then((url) => {
          console.log(url);

          setUrl(url);
        })
        .catch((error) => {
          console.log(error.message, "error getting the image url");
        });
      setProfile(null);
    });

    let contacts = {
      name,
      phone,
      type,
      isWhatsapp,
      url,
    };
    const lists =
      localStorage.getItem("lists") && localStorage.getItem("lists").length > 0
        ? JSON.parse(localStorage.getItem("lists"))
        : [];
    localStorage.setItem("lists", JSON.stringify([...lists, contacts]));
    // navigate("/");
  };

  return (
    <div>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-primary fw-bold"> Create Contact</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row  align-items-center">
              <div className="col-md-4">
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                    autoFocus
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="file"
                    className="form-control"
                    label="upload"
                    onChange={(e) => setProfile(e.target.files[0])}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="phone"
                    name="phone"
                    required
                  />
                </div>

                <div className="mb-2">
                  <div className="form-floating">
                    <select
                      onChange={(e) => {
                        const selectedType = e.target.value;
                        setType(selectedType);
                      }}
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      placeholder="Type"
                    >
                      <option select="true">Type</option>
                      <option value="Personal">Personal</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>
                </div>
                <div className="mb-2 ">
                  <label className="form-control">
                    Whatsapp number is same as mentioned?
                    <input
                      className="mx-2 "
                      type="checkbox"
                      name="isWhatsapp"
                      checked={isWhatsapp}
                      value="yes"
                      // value={isWhatsapp}
                      onChange={(e) =>
                        setIsWhatsapp(e.target.checked, e.target.value)
                      }
                    />
                    Yes
                  </label>
                </div>
                <div className="mb-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    // value="Create"
                  >
                    {" "}
                    Create
                  </button>
                  <Link to={"/contact-list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <img
                  src={url}
                  //onChange={(e) => setUrl(e.target.value)}
                  alt=""
                  className="contact-img"
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Addcontact;
