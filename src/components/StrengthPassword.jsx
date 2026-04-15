import React, { useState, useEffect } from "react";
import { Icon } from "./ui/Icon";

const StrengthPassword = ({
  onChange,
  name = "password",
  label = "Contraseña",
}) => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const calculateStrength = (pwd) => {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length >= 8) score += 25;
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

  const getStatus = () => {
    if (strength <= 25) return { color: "progress-error", text: "Muy débil" };
    if (strength <= 50) return { color: "progress-warning", text: "Débil" };
    if (strength <= 75) return { color: "progress-info", text: "Segura" };
    return { color: "progress-success", text: "Muy segura" };
  };

  const status = getStatus();

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold text-[#5C6F68]">{label}</span>
      </label>
      <div className="relative">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="input input-bordered w-full pr-10 focus:border-[#5C6F68] outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/50 hover:text-[#5C6F68]"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? "visibility_off" : "visibility"}
            size="sm"
          />
        </button>
      </div>

      {password && (
        <div className="mt-2 animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold uppercase text-[#5C6F68]">
              Fuerza: {status.text}
            </span>
            <span className="text-[10px] text-[#8AA39B]">{strength}%</span>
          </div>
          <progress
            className={`progress w-full ${status.color} transition-all duration-500 h-1.5`}
            value={strength}
            max="100"
          ></progress>
        </div>
      )}
    </div>
  );
};

export default StrengthPassword;
