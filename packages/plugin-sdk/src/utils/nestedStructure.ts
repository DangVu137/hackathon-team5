// Recursive function to build a nested structure representation
const buildNestedStructure = (element: HTMLElement): any => {
  const node = {
    tag: element.tagName.toLowerCase(),
    id: element.id || null,
    className: element.className || null,
    text: element.textContent?.trim() || null,
    children: [],
    element,
  };
  // Recursively process all child elements
  Array.from(element.children).forEach((child) => {
    // @ts-ignore
    node.children.push(buildNestedStructure(child as HTMLElement));
  });

  return node;
};
// Recursive function to assign unique IDs to elements
const assignIds = (node: any, parentId: string = '') => {
  const { element, children } = node;
  // Build a nested structure from the DOM
  const currentId = parentId ? `${parentId}_${children.length}` : 'pluginTest';
  element.id = `#${currentId}`;

  // Assign unique IDs to all elements in the nested structure
  children.forEach((childNode: any, index: number) => {
    assignIds(childNode, `${currentId}_${index + 1}`);
  });
};
export const nestedStructure = {
  buildNestedStructure,
  assignIds,
};
