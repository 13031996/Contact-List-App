import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contactlist = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const lists = localStorage.getItem("lists");
    setLists(JSON.parse(lists));
  }, []);

  const handleDelete = (a) => {
    const finalData = lists.filter((contact, index) => {
      if (index !== a) {
        return contact;
      }

      return false;
    });
    setLists(finalData);
    localStorage.setItem("lists", JSON.stringify(finalData));
  };

  const handleEdit = (index) => {
    localStorage.setItem("editItem", index);
  };
  return (
    <>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  Contact List
                  <Link to={"/add-contact"} className="btn btn-primary ms-3">
                    {" "}
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2"></div>
                  </div>
                  <div className="col"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-list">
        <div className="container">
          <div className="row">
            {lists && lists.length > 0 ? (
              lists.map((contact, index) => {
                return (
                  <div className="col-md-6" key={index}>
                    <div className="card my-2">
                      <div className="card-body">
                        <div className="row align-items-center d-flex justify-content-around">
                          <div className="col-md-4">
                            <img
                              src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
                              alt=""
                              className=" contact-img"
                            />
                          </div>
                          <div className="col-md-7">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action">
                                Name :{" "}
                                <span className="fw-bold">{contact.name}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Mobile :{" "}
                                <span className="fw-bold">{contact.phone}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                isWhatsapp :{" "}
                                <span className="fw-bold">
                                  {contact.isWhatsapp.toString()}
                                </span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Type :{" "}
                                <span className="fw-bold">{contact.type}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-1 d-flex flex-column align-items-center">
                            <Link
                              to={`/edit-contact/${index}`}
                              className="btn btn-primary my-1"
                              onClick={() => handleEdit(index)}
                            >
                              <i className="fa fa-pen" />
                            </Link>
                            <button
                              className="btn btn-danger my-1"
                              onClick={() => handleDelete(index)}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3> No contacts saved.</h3>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contactlist;
