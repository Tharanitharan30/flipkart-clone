import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Flipkart Clone" },
      { name: "description", content: "Sign in to your Flipkart Clone account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [tab, setTab] = useState<"phone" | "email">("phone");
  const [step, setStep] = useState<"id" | "otp">("id");
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const nav = useNavigate();
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const onContinue = () => {
    if (step === "id") {
      if (value.trim().length >= 4) setStep("otp");
    } else {
      if (otp.join("").length === 6) {
        alert("Logged in (demo)");
        nav({ to: "/" });
      }
    }
  };

  const setOtpAt = (i: number, v: string) => {
    const ch = v.replace(/\D/g, "").slice(-1);
    setOtp((prev) => prev.map((c, j) => (j === i ? ch : c)));
    if (ch && i < 5) inputs.current[i + 1]?.focus();
  };

  return (
    <main className="mx-auto flex max-w-md flex-col items-center px-4 py-8">
      <div className="w-full overflow-hidden rounded bg-white shadow">
        <div className="bg-fk-blue p-6 text-white">
          <h1 className="text-2xl font-semibold">
            {step === "id" ? "Login" : "Enter OTP"}
          </h1>
          <p className="mt-1 text-sm text-white/85">
            {step === "id"
              ? "Get access to your Orders, Wishlist and Recommendations"
              : `We've sent a verification code to ${value}`}
          </p>
        </div>

        <div className="p-6">
          {step === "id" ? (
            <>
              <div className="mb-4 grid grid-cols-2 rounded border border-border text-sm font-semibold">
                <button
                  onClick={() => setTab("phone")}
                  className={`py-2 ${tab === "phone" ? "bg-fk-blue text-white" : "text-fk-text"}`}
                >
                  Phone
                </button>
                <button
                  onClick={() => setTab("email")}
                  className={`py-2 ${tab === "email" ? "bg-fk-blue text-white" : "text-fk-text"}`}
                >
                  Email
                </button>
              </div>

              <label className="block">
                <span className="sr-only">{tab === "phone" ? "Phone number" : "Email"}</span>
                <input
                  type={tab === "phone" ? "tel" : "email"}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={tab === "phone" ? "Enter Mobile Number" : "Enter Email"}
                  className="w-full border-b border-fk-blue bg-transparent py-3 text-base outline-none focus:border-fk-blue-dark"
                  aria-label={tab === "phone" ? "Mobile number" : "Email"}
                />
              </label>

              <p className="mt-4 text-xs text-fk-muted">
                By continuing, you agree to Flipkart Clone's Terms of Use and Privacy Policy.
              </p>
            </>
          ) : (
            <div className="flex justify-between gap-2">
              {otp.map((v, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  value={v}
                  onChange={(e) => setOtpAt(i, e.target.value)}
                  maxLength={1}
                  inputMode="numeric"
                  aria-label={`OTP digit ${i + 1}`}
                  className="h-12 w-10 rounded border border-border text-center text-xl font-semibold outline-none focus:border-fk-blue"
                />
              ))}
            </div>
          )}

          <button
            onClick={onContinue}
            className="mt-6 w-full rounded-sm bg-fk-orange py-3 text-sm font-semibold uppercase tracking-wide text-white shadow hover:brightness-95"
          >
            {step === "id" ? "Continue" : "Verify & Login"}
          </button>

          {step === "otp" && (
            <button
              onClick={() => setStep("id")}
              className="mt-3 w-full text-center text-xs font-semibold uppercase text-fk-blue"
            >
              Change number
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
