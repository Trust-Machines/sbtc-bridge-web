import { _ as __vitePreload } from "../chunks/preload-helper.6910039e.js";
import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, a as afterUpdate, o as onMount, b as setContext, c as space, e as empty, f as claim_space, g as insert_hydration_dev, h as transition_out, j as check_outros, k as transition_in, l as detach_dev, m as binding_callbacks, n as construct_svelte_component_dev, p as element, q as claim_element, r as children, u as attr_dev, w as set_style, x as add_location, y as text, z as claim_text, A as set_data_dev, B as group_outros, C as create_component, D as claim_component, E as mount_component, F as destroy_component } from "../chunks/index.3d25d054.js";
let dictionary, hooks, matchers, nodes, Root, server_loads;
let __tla = (async () => {
  const BROWSER = true;
  matchers = {};
  const browser = BROWSER;
  const file = ".svelte-kit/generated/root.svelte";
  function create_else_block(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = ctx[1][0];
    function switch_props(ctx2) {
      let switch_instance_props = {
        data: ctx2[3],
        form: ctx2[2]
      };
      return {
        props: switch_instance_props,
        $$inline: true
      };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
      ctx[12](switch_instance);
    }
    const block = {
      c: function create() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      l: function claim(nodes2) {
        if (switch_instance)
          claim_component(switch_instance.$$.fragment, nodes2);
        switch_instance_anchor = empty();
      },
      m: function mount(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert_hydration_dev(target, switch_instance_anchor, anchor);
        current = true;
      },
      p: function update(ctx2, dirty) {
        const switch_instance_changes = {};
        if (dirty & 8)
          switch_instance_changes.data = ctx2[3];
        if (dirty & 4)
          switch_instance_changes.form = ctx2[2];
        if (dirty & 2 && switch_value !== (switch_value = ctx2[1][0])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
            ctx2[12](switch_instance);
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          switch_instance.$set(switch_instance_changes);
        }
      },
      i: function intro(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        ctx[12](null);
        if (detaching)
          detach_dev(switch_instance_anchor);
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_else_block.name,
      type: "else",
      source: "(44:0) {:else}",
      ctx
    });
    return block;
  }
  function create_if_block_2(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = ctx[1][0];
    function switch_props(ctx2) {
      let switch_instance_props = {
        data: ctx2[3],
        $$slots: {
          default: [
            create_default_slot
          ]
        },
        $$scope: {
          ctx: ctx2
        }
      };
      return {
        props: switch_instance_props,
        $$inline: true
      };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
      ctx[11](switch_instance);
    }
    const block = {
      c: function create() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      l: function claim(nodes2) {
        if (switch_instance)
          claim_component(switch_instance.$$.fragment, nodes2);
        switch_instance_anchor = empty();
      },
      m: function mount(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert_hydration_dev(target, switch_instance_anchor, anchor);
        current = true;
      },
      p: function update(ctx2, dirty) {
        const switch_instance_changes = {};
        if (dirty & 8)
          switch_instance_changes.data = ctx2[3];
        if (dirty & 8215) {
          switch_instance_changes.$$scope = {
            dirty,
            ctx: ctx2
          };
        }
        if (dirty & 2 && switch_value !== (switch_value = ctx2[1][0])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
            ctx2[11](switch_instance);
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          switch_instance.$set(switch_instance_changes);
        }
      },
      i: function intro(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        ctx[11](null);
        if (detaching)
          detach_dev(switch_instance_anchor);
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block_2.name,
      type: "if",
      source: "(40:0) {#if constructors[1]}",
      ctx
    });
    return block;
  }
  function create_default_slot(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = ctx[1][1];
    function switch_props(ctx2) {
      let switch_instance_props = {
        data: ctx2[4],
        form: ctx2[2]
      };
      return {
        props: switch_instance_props,
        $$inline: true
      };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
      ctx[10](switch_instance);
    }
    const block = {
      c: function create() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      l: function claim(nodes2) {
        if (switch_instance)
          claim_component(switch_instance.$$.fragment, nodes2);
        switch_instance_anchor = empty();
      },
      m: function mount(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert_hydration_dev(target, switch_instance_anchor, anchor);
        current = true;
      },
      p: function update(ctx2, dirty) {
        const switch_instance_changes = {};
        if (dirty & 16)
          switch_instance_changes.data = ctx2[4];
        if (dirty & 4)
          switch_instance_changes.form = ctx2[2];
        if (dirty & 2 && switch_value !== (switch_value = ctx2[1][1])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx2));
            ctx2[10](switch_instance);
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          switch_instance.$set(switch_instance_changes);
        }
      },
      i: function intro(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o: function outro(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d: function destroy(detaching) {
        ctx[10](null);
        if (detaching)
          detach_dev(switch_instance_anchor);
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_default_slot.name,
      type: "slot",
      source: "(41:1) <svelte:component this={constructors[0]} bind:this={components[0]} data={data_0}>",
      ctx
    });
    return block;
  }
  function create_if_block(ctx) {
    let div;
    let if_block = ctx[6] && create_if_block_1(ctx);
    const block = {
      c: function create() {
        div = element("div");
        if (if_block)
          if_block.c();
        this.h();
      },
      l: function claim(nodes2) {
        div = claim_element(nodes2, "DIV", {
          id: true,
          "aria-live": true,
          "aria-atomic": true,
          style: true
        });
        var div_nodes = children(div);
        if (if_block)
          if_block.l(div_nodes);
        div_nodes.forEach(detach_dev);
        this.h();
      },
      h: function hydrate() {
        attr_dev(div, "id", "svelte-announcer");
        attr_dev(div, "aria-live", "assertive");
        attr_dev(div, "aria-atomic", "true");
        set_style(div, "position", "absolute");
        set_style(div, "left", "0");
        set_style(div, "top", "0");
        set_style(div, "clip", "rect(0 0 0 0)");
        set_style(div, "clip-path", "inset(50%)");
        set_style(div, "overflow", "hidden");
        set_style(div, "white-space", "nowrap");
        set_style(div, "width", "1px");
        set_style(div, "height", "1px");
        add_location(div, file, 48, 1, 1110);
      },
      m: function mount(target, anchor) {
        insert_hydration_dev(target, div, anchor);
        if (if_block)
          if_block.m(div, null);
      },
      p: function update(ctx2, dirty) {
        if (ctx2[6]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_1(ctx2);
            if_block.c();
            if_block.m(div, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d: function destroy(detaching) {
        if (detaching)
          detach_dev(div);
        if (if_block)
          if_block.d();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block.name,
      type: "if",
      source: "(48:0) {#if mounted}",
      ctx
    });
    return block;
  }
  function create_if_block_1(ctx) {
    let t;
    const block = {
      c: function create() {
        t = text(ctx[7]);
      },
      l: function claim(nodes2) {
        t = claim_text(nodes2, ctx[7]);
      },
      m: function mount(target, anchor) {
        insert_hydration_dev(target, t, anchor);
      },
      p: function update(ctx2, dirty) {
        if (dirty & 128)
          set_data_dev(t, ctx2[7]);
      },
      d: function destroy(detaching) {
        if (detaching)
          detach_dev(t);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_if_block_1.name,
      type: "if",
      source: "(50:2) {#if navigated}",
      ctx
    });
    return block;
  }
  function create_fragment(ctx) {
    let current_block_type_index;
    let if_block0;
    let t;
    let if_block1_anchor;
    let current;
    const if_block_creators = [
      create_if_block_2,
      create_else_block
    ];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (ctx2[1][1])
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx);
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    let if_block1 = ctx[5] && create_if_block(ctx);
    const block = {
      c: function create() {
        if_block0.c();
        t = space();
        if (if_block1)
          if_block1.c();
        if_block1_anchor = empty();
      },
      l: function claim(nodes2) {
        if_block0.l(nodes2);
        t = claim_space(nodes2);
        if (if_block1)
          if_block1.l(nodes2);
        if_block1_anchor = empty();
      },
      m: function mount(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert_hydration_dev(target, t, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert_hydration_dev(target, if_block1_anchor, anchor);
        current = true;
      },
      p: function update(ctx2, [dirty]) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block0 = if_blocks[current_block_type_index];
          if (!if_block0) {
            if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block0.c();
          } else {
            if_block0.p(ctx2, dirty);
          }
          transition_in(if_block0, 1);
          if_block0.m(t.parentNode, t);
        }
        if (ctx2[5]) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block(ctx2);
            if_block1.c();
            if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
      },
      i: function intro(local) {
        if (current)
          return;
        transition_in(if_block0);
        current = true;
      },
      o: function outro(local) {
        transition_out(if_block0);
        current = false;
      },
      d: function destroy(detaching) {
        if_blocks[current_block_type_index].d(detaching);
        if (detaching)
          detach_dev(t);
        if (if_block1)
          if_block1.d(detaching);
        if (detaching)
          detach_dev(if_block1_anchor);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx
    });
    return block;
  }
  function instance($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    validate_slots("Root", slots, []);
    let { stores } = $$props;
    let { page } = $$props;
    let { constructors } = $$props;
    let { components = [] } = $$props;
    let { form } = $$props;
    let { data_0 = null } = $$props;
    let { data_1 = null } = $$props;
    afterUpdate(stores.page.notify);
    let mounted = false;
    let navigated = false;
    let title = null;
    onMount(() => {
      const unsubscribe = stores.page.subscribe(() => {
        if (mounted) {
          $$invalidate(6, navigated = true);
          $$invalidate(7, title = document.title || "untitled page");
        }
      });
      $$invalidate(5, mounted = true);
      return unsubscribe;
    });
    $$self.$$.on_mount.push(function() {
      if (stores === void 0 && !("stores" in $$props || $$self.$$.bound[$$self.$$.props["stores"]])) {
        console.warn("<Root> was created without expected prop 'stores'");
      }
      if (page === void 0 && !("page" in $$props || $$self.$$.bound[$$self.$$.props["page"]])) {
        console.warn("<Root> was created without expected prop 'page'");
      }
      if (constructors === void 0 && !("constructors" in $$props || $$self.$$.bound[$$self.$$.props["constructors"]])) {
        console.warn("<Root> was created without expected prop 'constructors'");
      }
      if (form === void 0 && !("form" in $$props || $$self.$$.bound[$$self.$$.props["form"]])) {
        console.warn("<Root> was created without expected prop 'form'");
      }
    });
    const writable_props = [
      "stores",
      "page",
      "constructors",
      "components",
      "form",
      "data_0",
      "data_1"
    ];
    Object.keys($$props).forEach((key) => {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
        console.warn(`<Root> was created with unknown prop '${key}'`);
    });
    function switch_instance_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        components[1] = $$value;
        $$invalidate(0, components);
      });
    }
    function switch_instance_binding_1($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        components[0] = $$value;
        $$invalidate(0, components);
      });
    }
    function switch_instance_binding_2($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        components[0] = $$value;
        $$invalidate(0, components);
      });
    }
    $$self.$$set = ($$props2) => {
      if ("stores" in $$props2)
        $$invalidate(8, stores = $$props2.stores);
      if ("page" in $$props2)
        $$invalidate(9, page = $$props2.page);
      if ("constructors" in $$props2)
        $$invalidate(1, constructors = $$props2.constructors);
      if ("components" in $$props2)
        $$invalidate(0, components = $$props2.components);
      if ("form" in $$props2)
        $$invalidate(2, form = $$props2.form);
      if ("data_0" in $$props2)
        $$invalidate(3, data_0 = $$props2.data_0);
      if ("data_1" in $$props2)
        $$invalidate(4, data_1 = $$props2.data_1);
    };
    $$self.$capture_state = () => ({
      setContext,
      afterUpdate,
      onMount,
      browser,
      stores,
      page,
      constructors,
      components,
      form,
      data_0,
      data_1,
      mounted,
      navigated,
      title
    });
    $$self.$inject_state = ($$props2) => {
      if ("stores" in $$props2)
        $$invalidate(8, stores = $$props2.stores);
      if ("page" in $$props2)
        $$invalidate(9, page = $$props2.page);
      if ("constructors" in $$props2)
        $$invalidate(1, constructors = $$props2.constructors);
      if ("components" in $$props2)
        $$invalidate(0, components = $$props2.components);
      if ("form" in $$props2)
        $$invalidate(2, form = $$props2.form);
      if ("data_0" in $$props2)
        $$invalidate(3, data_0 = $$props2.data_0);
      if ("data_1" in $$props2)
        $$invalidate(4, data_1 = $$props2.data_1);
      if ("mounted" in $$props2)
        $$invalidate(5, mounted = $$props2.mounted);
      if ("navigated" in $$props2)
        $$invalidate(6, navigated = $$props2.navigated);
      if ("title" in $$props2)
        $$invalidate(7, title = $$props2.title);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    $$self.$$.update = () => {
      if ($$self.$$.dirty & 768) {
        stores.page.set(page);
      }
    };
    return [
      components,
      constructors,
      form,
      data_0,
      data_1,
      mounted,
      navigated,
      title,
      stores,
      page,
      switch_instance_binding,
      switch_instance_binding_1,
      switch_instance_binding_2
    ];
  }
  Root = class Root extends SvelteComponentDev {
    constructor(options) {
      super(options);
      init(this, options, instance, create_fragment, safe_not_equal, {
        stores: 8,
        page: 9,
        constructors: 1,
        components: 0,
        form: 2,
        data_0: 3,
        data_1: 4
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: this,
        tagName: "Root",
        options,
        id: create_fragment.name
      });
    }
    get stores() {
      throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    set stores(value) {
      throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    get page() {
      throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    set page(value) {
      throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    get constructors() {
      throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    set constructors(value) {
      throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    get components() {
      throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    set components(value) {
      throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    get form() {
      throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    set form(value) {
      throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    get data_0() {
      throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    set data_0(value) {
      throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    get data_1() {
      throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
    set data_1(value) {
      throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  };
  nodes = [
    () => __vitePreload(() => import("../chunks/0.c49be2a4.js"), true ? ["../chunks/0.c49be2a4.js","../chunks/_layout.d82b8687.js","../chunks/bridge_api.00d99152.js","./_layout.svelte.1d7ef238.js","../chunks/preload-helper.6910039e.js","../chunks/index.3d25d054.js","../chunks/index.227a7d99.js","../chunks/index.cad881cf.js","../chunks/stacks.d784e5e7.js","../chunks/stores.3318b909.js","../chunks/paths.259231a7.js","../chunks/sbtc_admin.a26ce8ca.js","../chunks/navigation.81c09b7e.js","../chunks/singletons.167d3402.js","../chunks/UserBalance.071827a8.js","../chunks/utils.7513f4f0.js","../assets/_layout.4147e28b.css"] : void 0, import.meta.url),
    () => __vitePreload(() => import("../chunks/1.f7fa31a8.js"), true ? ["../chunks/1.f7fa31a8.js","./error.svelte.8f5fac6c.js","../chunks/index.3d25d054.js","../chunks/singletons.167d3402.js","../chunks/index.cad881cf.js","../chunks/paths.259231a7.js"] : void 0, import.meta.url),
    () => __vitePreload(() => import("../chunks/2.67a19d0d.js"), true ? ["../chunks/2.67a19d0d.js","../chunks/_page.ff02d51a.js","./_page.svelte.37288450.js","../chunks/index.3d25d054.js","../chunks/navigation.81c09b7e.js","../chunks/singletons.167d3402.js","../chunks/index.cad881cf.js","../chunks/paths.259231a7.js","../chunks/stores.3318b909.js","../chunks/utils.7513f4f0.js","../assets/_page.39490207.css"] : void 0, import.meta.url),
    () => __vitePreload(() => import("../chunks/3.a0e96674.js"), true ? ["../chunks/3.a0e96674.js","./admin-page.svelte.b9478bef.js","../chunks/index.3d25d054.js","../chunks/sbtc_admin.a26ce8ca.js","../chunks/index.227a7d99.js","../chunks/index.cad881cf.js","../chunks/stores.3318b909.js","../assets/_page.4b9f9046.css"] : void 0, import.meta.url),
    () => __vitePreload(() => import("../chunks/4.b31a4126.js"), true ? ["../chunks/4.b31a4126.js","./history-page.svelte.60e04e36.js","../chunks/index.3d25d054.js","../chunks/bridge_api.00d99152.js","../chunks/utils.7513f4f0.js","../chunks/UserBalance.071827a8.js","../chunks/stores.3318b909.js","../chunks/index.cad881cf.js","../assets/_page.12c3e7b8.css"] : void 0, import.meta.url),
    () => __vitePreload(() => import("../chunks/5.fd2c3ded.js"), true ? ["../chunks/5.fd2c3ded.js","./unwrap-page.svelte.bdca2c3b.js","../chunks/index.3d25d054.js","../chunks/stores.3318b909.js","../chunks/index.cad881cf.js","../chunks/SbtcWalletDisplay.e29f7908.js","../chunks/index.227a7d99.js","../chunks/utils.7513f4f0.js","../chunks/stacks.d784e5e7.js","../chunks/bridge_api.00d99152.js","../assets/SbtcWalletDisplay.309b8ba0.css","../chunks/paths.259231a7.js","../assets/_page.52192d59.css"] : void 0, import.meta.url),
    () => __vitePreload(() => import("../chunks/6.99cfbfca.js"), true ? ["../chunks/6.99cfbfca.js","./wrap-page.svelte.e84c9ece.js","../chunks/index.3d25d054.js","../chunks/stores.3318b909.js","../chunks/index.cad881cf.js","../chunks/SbtcWalletDisplay.e29f7908.js","../chunks/index.227a7d99.js","../chunks/utils.7513f4f0.js","../chunks/stacks.d784e5e7.js","../chunks/bridge_api.00d99152.js","../assets/SbtcWalletDisplay.309b8ba0.css","../assets/_page.e75247aa.css"] : void 0, import.meta.url)
  ];
  server_loads = [];
  dictionary = {
    "/": [
      2
    ],
    "/admin": [
      3
    ],
    "/history": [
      4
    ],
    "/unwrap": [
      5
    ],
    "/wrap": [
      6
    ]
  };
  hooks = {
    handleError: ({ error }) => {
      console.error(error);
    }
  };
})();
export {
  __tla,
  dictionary,
  hooks,
  matchers,
  nodes,
  Root as root,
  server_loads
};
