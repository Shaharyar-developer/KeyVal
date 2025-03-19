/**
 * GJS example showing how to build javascript applications using Libadwaita Application.
 * @see https://gitlab.gnome.org/GNOME/libadwaita/-/blob/main/examples/hello-world/hello.c
 */

import Gio from "gi://Gio";
import GLib from "gi://GLib";
import Gtk from "gi://Gtk?version=4.0";
import Adw from "gi://Adw";
import { Header } from "./modules/header";

const loop = GLib.MainLoop.new(null, false);

const app = new Adw.Application({
  applicationId: "com.github.jumplink.gjs.adw-1-hello",
  flags: Gio.ApplicationFlags.FLAGS_NONE,
});

const onActivate = (app: Adw.Application) => {
  const window = new Gtk.ApplicationWindow({ application: app });
  window.set_title("Hello");
  window.set_default_size(200, 200);
  const quit = () => app.quit();
  window.connect("close-request", () => {
    quit();
    return false;
  });
  const children = Gtk.Box.new(Gtk.Orientation.VERTICAL, 0);
  children.append(Header(quit));
  window.set_child(children);
  window.present();
};

app.connect("activate", onActivate);
app.run([imports.system.programInvocationName].concat(ARGV));
