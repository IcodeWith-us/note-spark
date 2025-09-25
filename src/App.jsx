import React, { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Herosection from "./components/HeroSection";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoteSection from "./components/mainNotes/NoteSection";
const Archive = lazy(() => import("./components/archiveTab/ArchiveNotes"));
const Bin = lazy(() => import("./components/binTab/Bin"));
import { Toaster } from "./components/ui/sonner";
import useFetchNotes from "./store/useFetchNotes";
import useFetchArchive from "./store/useFetchArchive";
import useFetchDelete from "./store/useFetchDelete";
import Sidebar from "./components/sidebar/Sidebar";
const Signup = lazy(() => import("./components/Signup"));
const Signin = lazy(() => import("./components/Signin"));
import { supabase } from "./lib/supabaseClient";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const [session, setSession] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [active, setActive] = useState(() => {
    const savedActiveBar = localStorage.getItem("Note");
    return savedActiveBar ? JSON.parse(savedActiveBar) : false;
  });

  const [filterSearch, setFilterSearch] = useState("");
  const [toggle, setToggle] = useState(() => {
    const savedToggle = localStorage.getItem("toggleState");
    return savedToggle ? JSON.parse(savedToggle) : false;
  });

  const { notes } = useFetchNotes();
  const { archiveNotes } = useFetchArchive();
  const { deleteNotes } = useFetchDelete();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("toggleState", JSON.stringify(toggle));
    localStorage.setItem("Note", JSON.stringify(active));
  }, [toggle, active]);

  const handleToggle = () => setToggle((prev) => !prev);
  const handleClick = () => setIsOpen(!isOpen);
  const handleSearchFilter = (e) => setFilterSearch(e.target.value);

  const filteredNotesData = notes.filter((item) =>
    item.notes_title.toLowerCase().includes(filterSearch.toLowerCase())
  );
  const filteredArchiveData = archiveNotes.filter((item) =>
    item.notes_title.toLowerCase().includes(filterSearch.toLowerCase())
  );
  const filteredDeleteData = deleteNotes.filter((item) =>
    item.notes_title.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <Suspense fallback={null}>
      <Routes>
        {!session ? (
          <>
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route
            path="/"
            element={
              <div className="">
                <Navbar
                  buttonClick={handleClick}
                  activeTab={active}
                  toggle={toggle}
                  handleToggle={handleToggle}
                  onChangeFilter={handleSearchFilter}
                  onLogout={async () => {
                    await supabase.auth.signOut();
                    setSession(null);
                    window.location.href = "/login";
                  }}
                />
                <main className="relative flex">
                  <Sidebar
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    active={active}
                    setActive={setActive}
                  />
                  {isOpen && (
                    <div
                      className="fixed inset-0 bg-black/40 z-40 md:hidden"
                      onClick={() => setIsOpen(false)}
                    />
                  )}

                  <Herosection
                    isOpen={isOpen}
                    active={active}
                    setActive={setActive}
                  />
                </main>
              </div>
            }
          >
            <Route
              index
              element={
                <NoteSection
                  toggle={toggle}
                  displayFilteredData={filteredNotesData}
                />
              }
            />
            <Route
              path="archive"
              element={
                <Archive
                  toggle={toggle}
                  displayFilteredData={filteredArchiveData}
                />
              }
            />
            <Route
              path="bin"
              element={
                <Bin toggle={toggle} displayFilteredData={filteredDeleteData} />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>

      <Toaster position="bottom-left" />
    </Suspense>
  );
}

export default App;
