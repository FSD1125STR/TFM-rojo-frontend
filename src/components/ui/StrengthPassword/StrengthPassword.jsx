import { useState } from "react";
import { StrengthPasswordProps } from "./StrengthPassword.props";

const calculateStrength = (pwd) => {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length > 6) score += 25;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 25;
  if (/\d/.test(pwd)) score += 25;
  if (/[@$!%*?&]/.test(pwd)) score += 25;
  return score;
};

const getStatusColor = (strength) => {
  if (strength <= 25) return "progress-error";
  if (strength <= 50) return "progress-warning";
  if (strength <= 75) return "progress-info";
  return "progress-success";
};

const getStatusText = (strength) => {
  if (strength === 0) return "Introduce una clave";
  if (strength <= 25) return "Muy débil";
  if (strength <= 50) return "Débil";
  if (strength <= 75) return "Segura";
  return "Muy segura";
};

export function StrengthPassword({ onChange }) {
  const [password, setPassword] = useState("");
  const strength = calculateStrength(password);

  const handleChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    onChange(val, calculateStrength(val) >= 75);
  };

  return (
    <div className="w-full" test-id="el-s9t3r4p5">
      <input
        type="password"
        placeholder="••••••••"
        className="input input-bordered w-full focus:border-primary outline-none"
        value={password}
        onChange={handleChange}
      />
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span
            className={`text-xs font-bold ${strength > 0 ? "opacity-100" : "opacity-0"}`}
          >
            Fuerza: <span className="uppercase">{getStatusText(strength)}</span>
          </span>
          <span className="text-xs text-base-content/50">{strength}%</span>
        </div>
        <progress
          className={`progress w-full ${getStatusColor(strength)} transition-all duration-500`}
          value={strength}
          max="100"
        ></progress>
        <p className="text-[10px] text-base-content/50 mt-1 italic">
          Usa mayúsculas, números y símbolos para mayor seguridad.
        </p>
      </div>
    </div>
  );
}

StrengthPassword.propTypes = StrengthPasswordProps;
