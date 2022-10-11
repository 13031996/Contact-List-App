import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Addcontact = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [isWhatsapp, setIsWhatsapp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // upload to fireabse

    let contacts = {
      name,
      phone,
      type,
      isWhatsapp,
      // profile: database returned url
    };
    const lists =
      localStorage.getItem("lists") && localStorage.getItem("lists").length > 0
        ? JSON.parse(localStorage.getItem("lists"))
        : [];
    localStorage.setItem("lists", JSON.stringify([...lists, contacts]));
    navigate("/");
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
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                    required
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
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Create"
                  />
                  <Link to={"/contact-list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addcontact;
