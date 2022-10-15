import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "./firebase";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";

const Editcontact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState(null);
  // console.log(useParams, "check");
  const { contactId } = useParams();
  // alert(contactId);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (profile == null) return;
    const imageRef = ref(storage, `image/${profile.name + v4()}`);
    uploadBytes(imageRef, profile).then(() => {
      alert("image uploaded");
      getDownloadURL(imageRef)
        .then((urlRes) => {
          let contacts = {
            name,
            phone,
            type,
            isWhatsapp,
            profile,
            url: urlRes,
          };

          let lists =
            localStorage.getItem("lists") &&
            localStorage.getItem("lists").length > 0
              ? JSON.parse(localStorage.getItem("lists"))
              : [];

          const _list = lists.map((contact, contactIndex) => {
            if (contactIndex == localStorage.getItem("editItem")) {
              return contacts;
            } else {
              return contact;
            }
          });
          localStorage.setItem("lists", JSON.stringify(_list));
          navigate("/");

          console.log(url);

          setUrl(url);
        })
        .catch((error) => {
          console.log(error.message, "error getting the image url");
        });
      setProfile(null);
    });
  };

  useEffect(() => {
    if (contactId) {
      const list = JSON.parse(localStorage.getItem("lists"));
      const { name, phone, type, isWhatsapp, url, profile } = list[contactId];
      setName(name);
      setPhone(phone);
      setIsWhatsapp(isWhatsapp);
      setType(type);
      setUrl(url);
      setProfile(profile);
    }
  }, [contactId]);
  return (
    <div>
      <section className="add-contact p-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-info fw-bold"> Edit Contact</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                      <option>Type</option>
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
                      value={isWhatsapp}
                      onChange={(e) =>
                        setIsWhatsapp(e.target.checked, e.target.value)
                      }
                    />
                    Yes
                  </label>
                </div>

                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-info"
                    value="Update"
                  />
                  <Link to={"/contact-list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <img src={url} alt="" className="contact-img" />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Editcontact;
