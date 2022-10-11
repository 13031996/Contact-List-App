import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Editcontact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  console.log(useParams, "check");
  const { contactId } = useParams();
  // alert(contactId);
  const handleSubmit = (e) => {
    e.preventDefault();
    const contacts = {
      name,
      phone,
      type,
      isWhatsapp,
    };

    let lists =
      localStorage.getItem("lists") && localStorage.getItem("lists").length > 0
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
  };

  useEffect(() => {
    if (contactId) {
      const list = JSON.parse(localStorage.getItem("lists"));
      const { name, phone, type, isWhatsapp } = list[contactId];
      setName(name);
      setPhone(phone);
      setIsWhatsapp(isWhatsapp);
      setType(type);
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
          <div className="row align-items-center">
            <div className="col-md-4">
              <form onSubmit={handleSubmit}>
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
                    type="text"
                    className="form-control"
                    placeholder="Profile Picture Url"
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
                      <option selected={type === "Personal"} value="Personal">
                        Personal
                      </option>
                      <option selected={type === "Office"} value="Office">
                        Office
                      </option>
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
              </form>
            </div>
            <div className="col-md-6">
              <img
                src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
                alt=""
                className="contact-img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Editcontact;