import React, { useState, useEffect } from "react";

const StrengthPassword = ({ onChange }) => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);

  const calculateStrength = (pwd) => {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length > 6) score += 25;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 25;
    if (/\d/.test(pwd)) score += 25;
    if (/[@$!%*?&]/.test(pwd)) score += 25;
    return score;
  };

  useEffect(() => {
    const score = calculateStrength(password);
    setStrength(score);

    const isValid = score >= 75;
    onChange(password, isValid);
  }, [password]);

  const getStatusColor = () => {
    if (strength <= 25) return "progress-error";
    if (strength <= 50) return "progress-warning";
    if (strength <= 75) return "progress-info";
    return "progress-success";
  };

  const getStatusText = () => {
    if (strength === 0) return "Introduce una clave";
    if (strength <= 25) return "Muy débil";
    if (strength <= 50) return "Débil";
    if (strength <= 75) return "Segura";
    return "Muy segura";
  };

  return (
    <div className="w-full">
      <input
        type="password"
        placeholder="••••••••"
        className="input input-bordered w-full focus:border-[#5C6F68] outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span
            className={`text-xs font-bold ${strength > 0 ? "opacity-100" : "opacity-0"}`}
          >
            Fuerza: <span className="uppercase">{getStatusText()}</span>
          </span>
          <span className="text-xs text-[#8AA39B]">{strength}%</span>
        </div>
        <progress
          className={`progress w-full ${getStatusColor()} transition-all duration-500`}
          value={strength}
          max="100"
        ></progress>
        <p className="text-[10px] text-[#8AA39B] mt-1 italic">
          Usa mayúsculas, números y símbolos para mayor seguridad.
        </p>
      </div>
    </div>
  );
};

export default StrengthPassword;
