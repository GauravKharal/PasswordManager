import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
    if (form.site != "" && form.username != "" && form.password != "") {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setForm({ site: "", username: "", password: "" });
      toast("✔️ Saved Password", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("📋 Copied to Clipboard", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const deleteItem = (id) => {
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );
    toast(`🗑️  Deleted Password`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editItem = (id) => {
    setForm(passwordArray.filter((item) => item.id === id));
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  return (
    <section>
      <ToastContainer />
      <section className="container mx-auto p-8 max-w-4xl bg-[#f5f5dc] rounded-xl">
        <h3 className="text-center text-lg  pb-6 text-[#755f4e]">
          Your own Password Manager
        </h3>
        <section className="flex flex-col">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            type="text"
            className="input"
            placeholder="Website URL"
          />
          <section className="flex gap-8 relative">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              type="text"
              className="input"
              placeholder="Username"
            />

            <input
              value={form.password}
              onChange={handleChange}
              name="password"
              type={showPassword ? "text" : "password"}
              className="input pr-10"
              placeholder="Password"
            />
            <button
              className="absolute right-3 top-4"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-rounded/24/visible.png"
                  alt="visible"
                />
              ) : (
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/sf-black-filled/64/invisible.png"
                  alt="invisible"
                />
              )}
            </button>
          </section>
          <button
            onClick={savePassword}
            className="flex justify-center mx-auto mt-6 w-fit items-center gap-2 bg-[#f3bf97] rounded-lg py-[0.6rem] px-5 hover:bg-[#c9c3bd]"
            disabled={
              form.site == "" || form.username == "" || form.password == ""
                ? true
                : false
            }
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material/24/plus--v1.png"
              alt="plus--v1"
            />
            Save Password
          </button>
        </section>
      </section>

      <section className="container mx-auto max-w-4xl">
        <h3 className="text-center pt-8 pb-4 text-lg font-semibold">
          Saved Passwords
        </h3>
        {passwordArray.length === 0 ? (
          <h3 className="font-mono text-center bg-[rgba(255,245,212,0.7)] py-2">
            &lt; No Passwords Available &gt;
          </h3>
        ) : (
          <section className="overflow-x-auto">
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-[#f6e0b5] text-gray-600 text-base">
                <tr>
                  <th className="font-[550] py-2">Website URL</th>
                  <th className="font-[550] py-2">Username</th>
                  <th className="font-[550] py-2">Passwords</th>
                  <th className="font-[550] py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-[#fff5d4] text-base text-gray-700 ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-8 py-1 text-center">
                        <a
                          href={item.site}
                          className="italic font-mono text-blue-700"
                          target="_blank"
                        >
                          {item.site}
                        </a>
                      </td>
                      <td className="font-mono px-8 py-1 text-center">
                        <button
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          {item.username}
                        </button>
                      </td>
                      <td className="font-mono px-8 py-1 text-center">
                        <button
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          {"*".repeat(item.password.length)}
                        </button>
                      </td>
                      <td className="font-mono p-1 flex justify-center gap-4">
                        <button
                          onClick={() => {
                            editItem(item.id);
                          }}
                        >
                          <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/material-rounded/24/pencil.png"
                            alt="pencil"
                            className="opacity-55 hover:opacity-100"
                          />
                        </button>
                        <button
                          onClick={() => {
                            deleteItem(item.id);
                          }}
                        >
                          <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/material-rounded/24/delete.png"
                            alt="delete"
                            className="opacity-55 hover:opacity-100"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}
      </section>
    </section>
  );
};

export default Manager;
