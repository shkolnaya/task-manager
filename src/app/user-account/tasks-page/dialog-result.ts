export interface DialogResult<T> {
    data?: T,
    action: 'Submit' | 'Cancel' | 'ClickOutside'
    isNewProject?: boolean
}