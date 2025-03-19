import Adw from "@girs/adw-1";
import Gtk from "@girs/gtk-4.0";
import GLib from "@girs/glib-2.0";
import Gio from "@girs/gio-2.0";
import { KeyValPairsView } from "./keyval-pairs";
import { SettingsView } from "./settings";

const Stack = () => {
  const stack = new Adw.ViewStack();
  stack.add_titled_with_icon(
    KeyValPairsView(),
    "keyval-pairs",
    "Key-Value Pairs",
    "view-list-symbolic",
  );
  stack.add_titled_with_icon(
    SettingsView(),
    "settings",
    "Settings",
    "preferences-system-symbolic",
  );

  return stack;
};
const StackSwitcher = (stack: Adw.ViewStack) => {
  const switcher = new Adw.ViewSwitcher({
    policy: Adw.ViewSwitcherPolicy.WIDE,
  });
  switcher.width_request = 300;
  switcher.set_stack(stack);
  switcher.stack = stack;

  return switcher;
};

export const Header = (quit: () => void) => {
  const toolbar = new Adw.ToolbarView({ vexpand: false, hexpand: true });
  let title = new Adw.WindowTitle({
    title: "My App",
  });

  const addButton = new Gtk.Button({
    vexpand: false,
    css_classes: ["flat"],
    child: new Adw.ButtonContent({
      icon_name: "list-add-symbolic",
      vexpand: false,
    }),
  });
  const closeButton = new Gtk.Button({
    vexpand: false,
    css_classes: ["circular"],
    child: new Adw.ButtonContent({
      icon_name: "window-close-symbolic",
      vexpand: false,
    }),
  });
  const stack = Stack();
  closeButton.connect("clicked", () => quit());
  const bar = new Gtk.CenterBox({
    startWidget: addButton,
    centerWidget: StackSwitcher(stack),
    endWidget: closeButton,
    margin_end: 10,
    margin_start: 10,
    margin_top: 10,
  });
  toolbar.add_mnemonic_label(title);
  toolbar.add_top_bar(bar);
  return toolbar;
};
