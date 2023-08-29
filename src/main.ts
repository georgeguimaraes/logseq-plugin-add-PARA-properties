import "@logseq/libs";
import { PageEntity } from "@logseq/libs/dist/LSPlugin.user";
import para_template from "./para_template";

async function add_property_to_page(name: string, value: string) {
  const page = (await logseq.Editor.getCurrentPage()) as PageEntity;
  const blocks = await logseq.Editor.getCurrentPageBlocksTree();
  const first_block = blocks[0];

  const isEmpty =
    page.properties === undefined || Object.keys(page.properties).length === 0;

  if (isEmpty) {
    const properties: Record<string, any> = {};
    properties[name] = value;

    await logseq.Editor.insertBlock(first_block.uuid, "", {
      properties: properties,
      sibling: true,
      before: true,
      focus: true,
      isPageBlock: true,
    });
  } else {
    await logseq.Editor.upsertBlockProperty(first_block.uuid, name, value);
    await logseq.Editor.editBlock(first_block.uuid);
  }
}

async function file_page_under_para(property: string) {
  await add_property_to_page(property, "");
}

async function configure_page_type(type: string) {
  await add_property_to_page("page-type", type);
}

function openAddParaPropertiesMenuBar(e) {
  const { rect } = e;
  const template = `
    <div id="addParaPropertiesMenu" class="hidden-picker">
      <span><button data-on-click="createParaRootPage">Create PARA Root Page</button></span>
    </div>
    `;

  logseq.provideStyle(`
    #addParaPropertiesMenu {
      font-family: Roboto, sans-serif;
      font-size: 12px;
      font-weight: 600;
      padding: 8px 0;
      border-radius: 6px;
    }
  `);

  logseq.provideUI({
    key: "add-para-properties-menu",
    template: template,
    close: "outside",
    style: {
      width: "200px",
      top: `${rect.top + 40}px`,
      left: `${rect.right - 100}px`,
    },
  });
}

function createBlocksFromTemplate() {
  return para_template;
}

async function createParaRootPage() {
  const title = "PARA";
  const obj = (await logseq.Editor.getPage(title)) as PageEntity | null;
  if (obj === null) {
    const page = await logseq.Editor.createPage(
      title,
      {},
      {
        createFirstBlock: false,
        redirect: true,
      }
    );
    await logseq.Editor.insertBatchBlock(page.uuid, createBlocksFromTemplate());
  } else {
    logseq.Editor.openInRightSidebar(title);
    logseq.UI.showMsg("A page called 'PARA' already exists.", "warning");
  }
}

logseq
  .ready(() => {
    logseq.Editor.registerSlashCommand(
      "Project [file this page under a project]",
      async (_) => {
        file_page_under_para("project");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Area [file this page under an area]",
      async (_) => {
        file_page_under_para("area");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Resource [file this page under a resource]",
      async (_) => {
        file_page_under_para("resource");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Make this page a Project [using page-type]",
      async (_) => {
        configure_page_type("project");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Make this page an Area [using page-type]",
      async (_) => {
        configure_page_type("area");
      }
    );
    logseq.Editor.registerSlashCommand(
      "Make this page a Resource [using page-type]",
      async (_) => {
        configure_page_type("resource");
      }
    );

    logseq.provideModel({
      createParaRootPage: () => {
        console.log("createParaRootPage");
        createParaRootPage();
      },
      openAddParaPropertiesMenuBar: (e) => {
        console.log("openAddParaPropertiesMenuBar");
        openAddParaPropertiesMenuBar(e);
      },
    });

    logseq.App.registerUIItem("toolbar", {
      key: "add-para-properties",
      template: `
                <button
                class="button" id="add-para-properties"
                data-on-click="openAddParaPropertiesMenuBar" data-rect>
                    <span id="add-para-properties-icon" style="font-size: 10px">
                        PARA
                    </span>
                </button>
            `,
    });
  })
  .catch(console.error);
