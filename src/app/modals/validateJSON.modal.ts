export function isValidJSON(item: any) {
    try {
      JSON.parse(item);
    } catch (error) {
      return false;
    }
    return true;
  }
  