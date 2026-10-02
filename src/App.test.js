import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.localStorage.clear();
});

test("searches by title and filters by genre", () => {
  render(<App />);

  fireEvent.change(
    screen.getByRole("searchbox", { name: /tìm kiếm theo tên phim/i }),
    {
      target: { value: "parasite" },
    },
  );

  expect(screen.getByRole("heading", { name: "Parasite" })).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Interstellar" }),
  ).not.toBeInTheDocument();

  fireEvent.change(
    screen.getByRole("searchbox", { name: /tìm kiếm theo tên phim/i }),
    {
      target: { value: "" },
    },
  );
  fireEvent.change(
    screen.getByRole("combobox", { name: /lọc theo thể loại/i }),
    {
      target: { value: "Drama" },
    },
  );

  expect(screen.getByRole("heading", { name: "Parasite" })).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Interstellar" }),
  ).not.toBeInTheDocument();
});

test("toggles theme, persists favorites, and shows movie details", () => {
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /tối/i }));
  expect(document.querySelector(".app-shell")).toHaveClass("theme-dark");

  fireEvent.click(screen.getAllByRole("button", { name: "Yêu thích" })[0]);
  expect(screen.getByText("Yêu thích:").parentElement).toHaveTextContent(
    "Yêu thích: 1",
  );
  expect(window.localStorage.getItem("favoriteMovies")).toBe("[1]");
  expect(screen.getByRole("button", { name: "Bỏ thích" })).toBeInTheDocument();

  fireEvent.click(screen.getAllByRole("button", { name: "Chi tiết" })[0]);
  expect(alertSpy).toHaveBeenCalledWith(
    expect.stringContaining("Title: Interstellar\nGenre: Sci-Fi\nYear: 2014"),
  );

  fireEvent.click(screen.getByRole("button", { name: "Bỏ thích" }));
  expect(screen.getByText("Yêu thích:").parentElement).toHaveTextContent(
    "Yêu thích: 0",
  );
  expect(window.localStorage.getItem("favoriteMovies")).toBe("[]");
  alertSpy.mockRestore();
});
