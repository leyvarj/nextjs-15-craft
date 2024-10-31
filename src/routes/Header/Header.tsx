import Link from "next/link";
import styles from "../Header/header.module.css";
import ThemeToggle from "@/components/Context/ThemeToggle";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/"> Logo </Link>
        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Header;
