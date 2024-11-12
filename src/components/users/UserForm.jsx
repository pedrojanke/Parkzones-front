import React, { useEffect, useState } from "react";

const UserForm = ({ onSubmit, initialData, buttonText }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_type, setUser_type] = useState("funcionario");
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const errors = {};
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      errors.password = "A senha deve ter no mínimo 8 caracteres.";
    }

    if (!specialCharRegex.test(password)) {
      errors.password = "A senha deve conter ao menos um caractere especial.";
    }

    const weakPasswords = [
      "12345678",
      "password",
      "123456789",
      "qwerty",
      "senha123",
      "abcdefg",
      "1234abcd",
    ];

    if (weakPasswords.includes(password)) {
      errors.password =
        "A senha escolhida é considerada fraca. Escolha outra senha.";
    }

    return errors;
  };

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setUser_type(initialData.user_type || "funcionario");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }

    if (!user_type) {
      alert("Por favor, selecione um tipo de usuário.");
      return;
    }

    try {
      await onSubmit({ name, email, password, user_type });
      setName("");
      setEmail("");
      setPassword("");
      setUser_type("funcionario");
      setErrors({});
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorMessages = err.response.data.message || [];
        const errorObj = {};

        errorMessages.forEach((message) => {
          if (message.includes("senha")) {
            errorObj.password = message;
          }
          if (message.includes("tipo de usuário")) {
            errorObj.user_type = message;
          }
        });

        setErrors(errorObj);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">{buttonText}</h2>
      <div className="mb-4">
        <label className="block mb-1">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Tipo de Usuário</label>
        <select
          value={user_type}
          onChange={(e) => setUser_type(e.target.value)}
          required
          className="w-full border rounded p-2"
        >
          <option value="funcionario">Funcionário</option>
          <option value="admin">Admin</option>
        </select>
        {errors.user_type && (
          <p className="text-red-500 text-sm">{errors.user_type}</p>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {buttonText}
      </button>
    </form>
  );
};

export default UserForm;
