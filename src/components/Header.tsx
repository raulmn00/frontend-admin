import { Popover } from "@headlessui/react";
export default function Header() {
  async function handleLogout() {
    localStorage.setItem("authToken", "");
    localStorage.setItem("user", "");
    window.location.href = "/login";
  }

  return (
    <>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <a
              href="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Home
            </a>
            <a
              href="/tickets"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Tickets
            </a>
            <a
              href="/students"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Estudantes
            </a>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              onClick={handleLogout}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Sair <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
