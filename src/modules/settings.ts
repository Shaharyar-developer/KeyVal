import Adw from "@girs/adw-1";
import Gtk from "@girs/gtk-4.0";
import GLib from "@girs/glib-2.0";
import Gio from "@girs/gio-2.0";

export const SettingsView = () => {
  const box = new Gtk.Box({});
  box.append(Gtk.Label.new("Settings"));
  return box;
};
