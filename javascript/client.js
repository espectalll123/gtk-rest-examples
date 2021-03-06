#!/usr/bin/env gjs

const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Soup = imports.gi.Soup;

const server = "http://localhost";

Gtk.init(null, 0);

let bld = new Gtk.Builder();
bld.add_from_file("../global/ui.glade");

var win = bld.get_object("appWindow");
var btn = bld.get_object("sendButton");
var ibuff = bld.get_object("inputBuffer");
var obuff = bld.get_object("outputBuffer");

var xhrs = Soup.Session.new()

btn.connect('clicked', function(){
    var idata = ibuff.get_text(
        ibuff.get_start_iter(),
        ibuff.get_end_iter(), true);
    
    var msg = Soup.Message.new('POST', server);
    msg.set_request('text/plain', 2, idata, idata.length);
    xhrs.send_message(msg);
    var data = msg.response_body.data;
    
    obuff.set_text(data, data.length);
});

win.show();
Gtk.main();
