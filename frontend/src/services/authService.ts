import { ref } from 'vue'

// NOTE: this is unsafe. In a real world setting, this should be JWT or something else.
var _username : string = '';
var _password : string = '';

export const GetCurrentUser = () => _username;

export const loggedIn = ref(false);

export async function authorize(user: string, pass: string) : Promise<void> 
{
    const credentials = btoa(`${user}:${pass}`);
    const response = await fetch('http://localhost:8000/api/authorize', {
        method: 'GET',
        headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
        },
    });

    if (response.status === 200) 
    {
        loggedIn.value = true;
        alert('successfully authorized, welcome back');
        _username = user;
        _password = pass;
    } 
    else if (response.status === 401) {
        alert('❌ wrong password')
    } 
    else 
    {
        alert(`⚠️ Unexpected error: ${response.status}`)
    }
}

function isNonEmptyString(value: string | null | undefined): boolean {
  return !!value && value.trim().length > 0
}

export function isAuthenticated() : boolean {
    return isNonEmptyString(_username) && isNonEmptyString(_password);
}

export function getAuthorizationHeaders() : HeadersInit 
{
    const credentials = btoa(`${_username}:${_password}`)
    return {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
    };
}
