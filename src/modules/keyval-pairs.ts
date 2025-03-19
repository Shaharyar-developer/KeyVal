import Adw from "@girs/adw-1";
import Gtk from "@girs/gtk-4.0";
import GLib from "@girs/glib-2.0";
import Gio from "@girs/gio-2.0";

const actions = [
  { key: "test", value: "test value", id: 1, createdOn: new Date() },
  { key: "test2", value: "test value 2", id: 2, createdOn: new Date() },
];
type Action = {
  key: string;
  value: string;
  id: number;
  createdOn: Date;
};

export const AddKeyValuePairButton = (
  label: string = "",
  parent: Gtk.Widget,
) => {
  const button = new Gtk.Button({
    css_classes: ["flat"],
    child: new Adw.ButtonContent({
      label: label,
      icon_name: "list-add-symbolic",
      vexpand: false,
    }),
  });
  button.connect("clicked", () => CreateKeyValuePair(parent));
  return button;
};

const ListItemWidget = (action: Action) => {
  const listItem = new Adw.ActionRow({
    title: action.key,
    activatable: true,
  });
  listItem.add_suffix(new Gtk.Image({ icon_name: "arrow-right-symbolic" }));
  listItem.add_prefix(
    new Gtk.Image({ icon_name: "system-lock-screen-symbolic" }),
  );

  return listItem;
};
export function CreateKeyValuePair(parent: Gtk.Widget) {
  const dialog = new Adw.Dialog({
    presentationMode: Adw.DialogPresentationMode.AUTO,
    width_request: 500,
    heightRequest: 300,
    can_close: true,
  });
  console.log("CreateKeyValuePair");
  dialog.set_child(new Gtk.Label({ label: "Create Key-Value Pair" }));
  dialog.present(parent);
  return dialog;
}

export const KeyValPairsView = () => {
  const box = new Gtk.Box({
    halign: Gtk.Align.CENTER,
    orientation: Gtk.Orientation.VERTICAL,
  });
  const _list = new Gtk.ListBox({
    selectionMode: Gtk.SelectionMode.NONE,
    css_classes: ["boxed-list-separate"],
    width_request: 500,
  });
  const list = new Gtk.ListBox({
    selectionMode: Gtk.SelectionMode.NONE,
    css_classes: ["boxed-list"],
    width_request: 500,
    marginTop: 40,
  });
  const addAction = new Adw.ActionRow({
    title: "Create ",
    subtitle: "Add a new key-value pair to the list",
    activatable: true,
  });
  addAction.connect("activated", () => CreateKeyValuePair(box));
  addAction.add_suffix(new Gtk.Image({ icon_name: "list-add-symbolic" }));

  for (const action of actions) {
    const listItem = ListItemWidget(action);
    list.append(listItem);
  }

  _list.append(addAction);
  box.append(_list);
  box.append(list);
  return box;
};
