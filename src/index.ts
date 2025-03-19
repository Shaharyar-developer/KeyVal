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
  const vbox = Gtk.Box.new(Gtk.Orientation.VERTICAL, 0);
  const { toolbar, stack } = Header(quit);
  vbox.append(toolbar);
  vbox.append(stack);
  window.set_child(vbox);
  window.present();
};

app.connect("activate", onActivate);
app.run([imports.system.programInvocationName].concat(ARGV));
