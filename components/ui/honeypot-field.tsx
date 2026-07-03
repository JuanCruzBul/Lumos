"use client";

/**
 * Campo trampa anti-bots (honeypot). Invisible y no focuseable para humanos;
 * los bots que autocompletan todos los campos lo llenan y el endpoint
 * `/api/contact` descarta esos envíos.
 */
export function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0 }}>
      {/* label envolvente para no duplicar ids: el componente se monta en dos formularios de la misma página */}
      <label>
        No completar este campo
        <input
          type="text"
          name="website"
          value={value}
          onChange={onChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
    </div>
  );
}
