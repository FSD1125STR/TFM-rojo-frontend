import React from "react";
import { Icon } from "./ui/Icon";

export function StrengthIndicator({ password = "" }) {
  const checks = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[@$!%*?&]/.test(password),
  };

  const getBarColor = (isValid) => (isValid ? "bg-green-600" : "bg-gray-300");

  return (
    <div className="mt-3 space-y-3">
      <div className="flex gap-2 h-1.5">
        <div
          className={`flex-1 rounded-full transition-colors duration-300 ${getBarColor(checks.length)}`}
        ></div>
        <div
          className={`flex-1 rounded-full transition-colors duration-300 ${getBarColor(checks.hasUpper)}`}
        ></div>
        <div
          className={`flex-1 rounded-full transition-colors duration-300 ${getBarColor(checks.hasNumber)}`}
        ></div>
        <div
          className={`flex-1 rounded-full transition-colors duration-300 ${getBarColor(checks.hasSymbol)}`}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-y-2">
        <div
          className={`flex items-center gap-2 text-xs font-medium ${checks.length ? "text-green-700" : "text-gray-400"}`}
        >
          <Icon
            name="check_circle"
            size="xs"
            className={checks.length ? "text-green-600" : "text-gray-300"}
          />
          <span>8+ caracteres</span>
        </div>
        <div
          className={`flex items-center gap-2 text-xs font-medium ${checks.hasUpper ? "text-green-700" : "text-gray-400"}`}
        >
          <Icon
            name="check_circle"
            size="xs"
            className={checks.hasUpper ? "text-green-600" : "text-gray-300"}
          />
          <span>Mayúscula</span>
        </div>
        <div
          className={`flex items-center gap-2 text-xs font-medium ${checks.hasNumber ? "text-green-700" : "text-gray-400"}`}
        >
          <Icon
            name="check_circle"
            size="xs"
            className={checks.hasNumber ? "text-green-600" : "text-gray-300"}
          />
          <span>Número</span>
        </div>
        <div
          className={`flex items-center gap-2 text-xs font-medium ${checks.hasSymbol ? "text-green-700" : "text-gray-400"}`}
        >
          <Icon
            name="check_circle"
            size="xs"
            className={checks.hasSymbol ? "text-green-600" : "text-gray-300"}
          />
          <span>Símbolo (@#$!)</span>
        </div>
      </div>
    </div>
  );
}
