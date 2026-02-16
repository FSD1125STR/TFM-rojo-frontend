import { Icon } from "../../../components/ui/Icon";

export function StrengthIndicator({ password }) {
  const checks = [
    { label: "Mínimo 8 caracteres", regex: /.{8,}/ },
    { label: "Una minúscula", regex: /[a-z]/ },
    { label: "Una mayúscula", regex: /[A-Z]/ },
    { label: "Un número", regex: /[0-9]/ },
    { label: "Un carácter especial", regex: /[^A-Za-z0-9]/ },
  ];

  const strength = checks.filter((c) => c.regex.test(password)).length;

  return (
    <div test-id="el-p4s9w0r1" className="mt-2 space-y-2">
      <div className="flex gap-1 h-1">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`h-full w-full rounded-full transition-colors duration-500 ${
              strength >= step
                ? strength <= 2
                  ? "bg-error"
                  : strength <= 4
                    ? "bg-warning"
                    : "bg-success"
                : "bg-base-300"
            }`}
          />
        ))}
      </div>

      <ul className="text-xs space-y-1">
        {checks.map((check, index) => {
          const isMet = check.regex.test(password);
          return (
            <li
              key={index}
              className={`flex items-center gap-2 ${isMet ? "text-success" : "text-base-content/50"}`}
            >
              <Icon name={isMet ? "check_circle" : "cancel"} size="xs" />
              {check.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
