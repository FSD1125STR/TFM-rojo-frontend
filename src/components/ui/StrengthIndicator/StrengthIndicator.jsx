import { Icon } from "../Icon";
import { StrengthIndicatorProps } from "./StrengthIndicator.props";

const CHECKS = [
  { label: "8+ caracteres", regex: /.{8,}/ },
  { label: "Mayúscula", regex: /[A-Z]/ },
  { label: "Número", regex: /[0-9]/ },
  { label: "Símbolo (@#$!)", regex: /[^A-Za-z0-9]/ },
];

export function StrengthIndicator({ password }) {
  const strength = CHECKS.filter((c) => c.regex.test(password)).length;

  return (
    <div test-id="el-p4s9w0r1" className="mt-3 space-y-2">
      <div className="flex gap-1 h-1">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full w-full rounded-full transition-all duration-500 ${
              strength >= step
                ? strength <= 1
                  ? "bg-error"
                  : strength <= 3
                    ? "bg-warning"
                    : "bg-success"
                : "bg-base-300"
            }`}
          />
        ))}
      </div>

      <ul className="text-[10px] grid grid-cols-2 gap-1">
        {CHECKS.map((check) => {
          const isMet = check.regex.test(password);
          return (
            <li
              key={check.label}
              className={`flex items-center gap-1 transition-opacity ${isMet ? "text-success font-bold" : "opacity-40"}`}
            >
              <Icon name={isMet ? "check_circle" : "circle"} size="xs" aria-hidden="true" />
              {check.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

StrengthIndicator.propTypes = StrengthIndicatorProps;
