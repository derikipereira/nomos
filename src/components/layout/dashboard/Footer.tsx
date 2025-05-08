import React from "react";
const FooterDash: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <p className="text-center text-sm text-gray-500">
        &copy; {currentYear} Nomos. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default FooterDash;
